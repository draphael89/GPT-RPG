import argparse
import logging
import os
import time
from pathlib import Path
from typing import Dict

import yaml

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

DEFAULT_CONFIG = {
    "ignored_dirs": {"node_modules", "next", ".git", "build", "dist", ".next", "out"},
    "ignored_files": {"package-lock.json", "yarn.lock", ".gitignore", "README.md"},
    "allowed_extensions": {".ts", ".tsx", ".js", ".jsx", ".py"},
    "max_file_size": 100000,  # 100 KB
    "max_lines_per_file": 2000,
}

def load_config(config_file: str) -> Dict:
    try:
        with open(config_file, 'r') as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        logging.warning(f"Config file {config_file} not found. Using default configuration.")
        return DEFAULT_CONFIG
    except yaml.YAMLError as e:
        logging.error(f"Error parsing config file: {e}")
        return DEFAULT_CONFIG

def should_capture_file(file_path: Path, config: Dict) -> bool:
    return (
        file_path.suffix in config["allowed_extensions"]
        and file_path.name not in config["ignored_files"]
        and file_path.stat().st_size <= config["max_file_size"]
    )

def capture_file_content(file_path: Path, config: Dict) -> str:
    try:
        with file_path.open('r', encoding='utf-8') as f:
            content = f.read()
        return f"--- {file_path} ---\n{content}\n\n"
    except Exception as e:
        logging.error(f"Error reading file {file_path}: {str(e)}")
        return f"--- {file_path} ---\nError: {str(e)}\n\n"

def capture_codebase(root_dir: Path, config: Dict) -> str:
    codebase_content = ""
    total_files = 0
    total_lines = 0

    for dirpath, dirnames, filenames in os.walk(root_dir):
        current_path = Path(dirpath)
        
        # Exclude ignored directories
        dirnames[:] = [d for d in dirnames if d not in config["ignored_dirs"]]
        
        for filename in filenames:
            file_path = current_path / filename
            if should_capture_file(file_path, config):
                file_content = capture_file_content(file_path, config)
                codebase_content += file_content
                total_files += 1
                total_lines += len(file_content.splitlines())

    metadata = f"""Codebase Capture
Capture Time: {time.strftime('%Y-%m-%d %H:%M:%S')}
Total Files: {total_files}
Total Lines: {total_lines}

"""
    return metadata + codebase_content

def main(root_directory: str, output_file: str, config_file: str):
    config = load_config(config_file)
    root_path = Path(root_directory).resolve()
    
    logging.info(f"Starting codebase capture from {root_path}")
    codebase_content = capture_codebase(root_path, config)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(codebase_content)
    
    logging.info(f"Codebase captured and saved to {output_file}")
    logging.info(f"Total files: {codebase_content.splitlines()[2].split(': ')[1]}")
    logging.info(f"Total lines of code: {codebase_content.splitlines()[3].split(': ')[1]}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Capture codebase structure and content.")
    parser.add_argument("--root", default=".", help="Root directory of the codebase")
    parser.add_argument("--output", default="codebase_capture.txt", help="Output text file")
    parser.add_argument("--config", default="capture_config.yaml", help="Configuration YAML file")
    
    args = parser.parse_args()
    main(args.root, args.output, args.config)