
#!/usr/bin/env python3
"""
Project Snapshot Generator

This script scans TypeScript/React project files and generates a concise snapshot 
of key components, modules, and functions to help AI understand the codebase structure.
"""

import os
import re
import json
from pathlib import Path

# Define patterns to extract information
FUNCTION_PATTERN = re.compile(r'(export\s+)?(async\s+)?(function|const)\s+([a-zA-Z0-9_]+)\s*(\([^)]*\)|\s*=\s*\([^)]*\))')
CLASS_PATTERN = re.compile(r'(export\s+)?class\s+([a-zA-Z0-9_]+)')
INTERFACE_PATTERN = re.compile(r'(export\s+)?interface\s+([a-zA-Z0-9_]+)')
COMPONENT_PATTERN = re.compile(r'(export\s+)?(?:function|const)\s+([a-zA-Z0-9_]+)\s*(?:\([^)]*\)|\s*=\s*\([^)]*\))\s*(?:=>)?\s*{')
HOOK_PATTERN = re.compile(r'(export\s+)?(?:function|const)\s+(use[A-Z][a-zA-Z0-9_]*)')
DECORATOR_PATTERN = re.compile(r'export\s+function\s+([A-Z][a-zA-Z0-9_]*(?:Module|Decorator))')
IMPORT_PATTERN = re.compile(r'import\s+{?\s*([^}]*?)\s*}?\s+from\s+[\'"]([^\'"]+)[\'"]')
COMMENT_PATTERN = re.compile(r'/\*\*\s*([\s\S]*?)\s*\*/')

def extract_leading_comment(content, function_match):
    start_pos = function_match.start()
    # Look for comments before the function
    comment_text = ""
    
    # Find the nearest comment block before the function
    comment_matches = list(COMMENT_PATTERN.finditer(content[:start_pos]))
    if comment_matches:
        last_comment = comment_matches[-1]
        comment_text = last_comment.group(1).strip()
        
        # Remove asterisks and basic formatting
        comment_text = re.sub(r'\s*\*\s*', ' ', comment_text)
        comment_text = re.sub(r'\s+', ' ', comment_text)
    
    return comment_text

def process_file(file_path):
    """Process a TypeScript file and extract key information."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    file_info = {
        "path": str(file_path),
        "functions": [],
        "classes": [],
        "interfaces": [],
        "components": [],
        "hooks": [],
        "decorators": [],
        "imports": []
    }
    
    # Extract functions
    for match in FUNCTION_PATTERN.finditer(content):
        func_name = match.group(4)
        if func_name and not func_name.startswith('_'):
            comment = extract_leading_comment(content, match)
            file_info["functions"].append({
                "name": func_name,
                "description": comment if comment else "No description available"
            })
    
    # Extract components (React components specifically)
    for match in COMPONENT_PATTERN.finditer(content):
        comp_name = match.group(2)
        if comp_name and comp_name[0].isupper() and not comp_name.startswith('_'):
            comment = extract_leading_comment(content, match)
            file_info["components"].append({
                "name": comp_name,
                "description": comment if comment else "React component"
            })
    
    # Extract hooks
    for match in HOOK_PATTERN.finditer(content):
        hook_name = match.group(2)
        if hook_name and hook_name.startswith('use') and not hook_name.startswith('_'):
            comment = extract_leading_comment(content, match)
            file_info["hooks"].append({
                "name": hook_name,
                "description": comment if comment else "React hook"
            })
    
    # Extract classes
    for match in CLASS_PATTERN.finditer(content):
        class_name = match.group(2)
        if class_name and not class_name.startswith('_'):
            comment = extract_leading_comment(content, match)
            file_info["classes"].append({
                "name": class_name,
                "description": comment if comment else "No description available"
            })
    
    # Extract interfaces
    for match in INTERFACE_PATTERN.finditer(content):
        interface_name = match.group(2)
        if interface_name and not interface_name.startswith('_'):
            comment = extract_leading_comment(content, match)
            file_info["interfaces"].append({
                "name": interface_name,
                "description": comment if comment else "TypeScript interface"
            })
    
    # Extract decorators
    for match in DECORATOR_PATTERN.finditer(content):
        decorator_name = match.group(1)
        if decorator_name:
            comment = extract_leading_comment(content, match)
            file_info["decorators"].append({
                "name": decorator_name,
                "description": comment if comment else "Decorator function"
            })
    
    # Extract imports
    for match in IMPORT_PATTERN.finditer(content):
        imported = match.group(1).strip()
        source = match.group(2)
        if imported and source:
            # Split multiple imports
            import_items = [item.strip() for item in imported.split(',')]
            for item in import_items:
                if item and not item.startswith('_'):
                    file_info["imports"].append({
                        "name": item,
                        "source": source
                    })
    
    # Clean up empty sections
    for key in list(file_info.keys()):
        if not file_info[key] and key != "path":
            del file_info[key]
    
    return file_info

def scan_project(root_dir):
    """Scan the project directory for TypeScript files."""
    project_info = []
    
    # Define directories to exclude
    exclude_dirs = {'node_modules', 'dist', 'build', 'public', '.git'}
    
    for root, dirs, files in os.walk(root_dir):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if file.endswith(('.ts', '.tsx')) and not file.endswith(('.d.ts', '.test.ts', '.spec.ts')):
                file_path = Path(os.path.join(root, file))
                file_info = process_file(file_path)
                
                # Only add if we found something useful
                if any(len(file_info.get(k, [])) > 0 for k in ["functions", "classes", "interfaces", "components", "hooks", "decorators"]):
                    project_info.append(file_info)
    
    return project_info

def generate_summary(project_info):
    """Generate a concise summary of the project structures."""
    summary = {
        "core_modules": [],
        "components": [],
        "hooks": [],
        "utilities": [],
        "types": []
    }
    
    all_components = []
    all_hooks = []
    all_functions = []
    all_classes = []
    all_interfaces = []
    
    # First pass: collect all items
    for file_info in project_info:
        file_path = file_info["path"]
        
        for component in file_info.get("components", []):
            component["file"] = file_path
            all_components.append(component)
            
        for hook in file_info.get("hooks", []):
            hook["file"] = file_path
            all_hooks.append(hook)
            
        for func in file_info.get("functions", []):
            func["file"] = file_path
            all_functions.append(func)
            
        for cls in file_info.get("classes", []):
            cls["file"] = file_path
            all_classes.append(cls)
            
        for interface in file_info.get("interfaces", []):
            interface["file"] = file_path
            all_interfaces.append(interface)
    
    # Identify core modules
    core_module_patterns = ["loader", "registry", "store", "context", "provider"]
    for cls in all_classes:
        for pattern in core_module_patterns:
            if pattern.lower() in cls["name"].lower() or pattern.lower() in cls["file"].lower():
                summary["core_modules"].append({
                    "name": cls["name"],
                    "type": "class",
                    "file": cls["file"],
                    "description": cls["description"]
                })
    
    # Add components
    for comp in all_components:
        summary["components"].append({
            "name": comp["name"],
            "file": comp["file"],
            "description": comp["description"]
        })
    
    # Add hooks
    for hook in all_hooks:
        summary["hooks"].append({
            "name": hook["name"],
            "file": hook["file"],
            "description": hook["description"]
        })
    
    # Add utility functions
    utility_patterns = ["util", "helper", "format", "validate", "transform"]
    for func in all_functions:
        for pattern in utility_patterns:
            if pattern.lower() in func["name"].lower() or pattern.lower() in func["file"].lower():
                summary["utilities"].append({
                    "name": func["name"],
                    "file": func["file"],
                    "description": func["description"]
                })
    
    # Add important types and interfaces
    for interface in all_interfaces:
        summary["types"].append({
            "name": interface["name"],
            "file": interface["file"],
            "description": interface["description"]
        })
    
    # Clean up empty sections
    for key in list(summary.keys()):
        if not summary[key]:
            del summary[key]
    
    return summary

def main():
    # Get the project root directory (current directory)
    root_dir = os.getcwd()
    
    print(f"Scanning project in: {root_dir}")
    project_info = scan_project(root_dir)
    
    # Generate summary
    summary = generate_summary(project_info)
    
    # Write to file in a concise format
    output_file = os.path.join(root_dir, "project_snapshot.json")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)
    
    # Generate a more AI-friendly text version
    ai_output_file = os.path.join(root_dir, "project_snapshot.md")
    with open(ai_output_file, 'w', encoding='utf-8') as f:
        f.write("# Project Snapshot\n\n")
        
        # Core modules
        if "core_modules" in summary:
            f.write("## Core Modules\n\n")
            for module in summary["core_modules"]:
                f.write(f"- **{module['name']}** ({os.path.basename(module['file'])}): {module['description']}\n")
            f.write("\n")
            
        # Components
        if "components" in summary:
            f.write("## UI Components\n\n")
            for comp in summary["components"]:
                f.write(f"- **{comp['name']}** ({os.path.basename(comp['file'])}): {comp['description']}\n")
            f.write("\n")
            
        # Hooks
        if "hooks" in summary:
            f.write("## React Hooks\n\n")
            for hook in summary["hooks"]:
                f.write(f"- **{hook['name']}** ({os.path.basename(hook['file'])}): {hook['description']}\n")
            f.write("\n")
            
        # Utilities
        if "utilities" in summary:
            f.write("## Utility Functions\n\n")
            for util in summary["utilities"]:
                f.write(f"- **{util['name']}** ({os.path.basename(util['file'])}): {util['description']}\n")
            f.write("\n")
            
        # Types
        if "types" in summary:
            f.write("## Key Types and Interfaces\n\n")
            for typ in summary["types"]:
                f.write(f"- **{typ['name']}** ({os.path.basename(typ['file'])}): {typ['description']}\n")
            f.write("\n")
    
    print(f"Project snapshot written to: {output_file}")
    print(f"AI-friendly snapshot written to: {ai_output_file}")

if __name__ == "__main__":
    main()
