#!/usr/bin/env python3

# Usage: python3 gen-media.py
# After run this script, you need to run `ga . && pnpm lint-staged` to format the code
import os

assets_dir = "./src/assets"

def removeExt(file: str):
  return file.split(".")[0]

def capitalizeFirstLetter(name: str):
  if len(name) > 0 and name[0].isdigit():
    name = "_" + name
  name_li = name.split("-")
  res = ""
  for n in name_li:
    if len(n) == 1:
      res += n[0].upper()
    elif len(n) > 1:
      res += n[0].upper() + n[1:]
    else:
      pass
  return res

def imageFileValidate(file: str):
  return file.endswith((".svg", ".png", ".jpg", ".jpeg", ".json", ".mp3"))

def generate_index(directory: str):
    # Get all files and directories in current path
    entries = os.listdir(directory)
    files = []
    dirs = []
    
    for entry in entries:
        full_path = os.path.join(directory, entry)
        if os.path.isfile(full_path) and entry != 'index.ts':
            files.append(entry)
        elif os.path.isdir(full_path):
            dirs.append(entry)
            # Recursively process subdirectories
            generate_index(full_path)
    
    # Generate index.ts for current directory
    with open(os.path.join(directory, "index.ts"), 'w') as f:
        # Import statements
        for file in files:
            if imageFileValidate(file):
                f.write(f"import {capitalizeFirstLetter(removeExt(file))}Img from \"./{file}\";\n")
        
        # Import from subdirectories
        for dir_name in dirs:
            f.write(f"import * as {capitalizeFirstLetter(dir_name)} from \"./{dir_name}\";\n")
        
        f.write("\n")
        f.write("export {\n")
        
        # Export image files
        for file in files:
            if imageFileValidate(file):
                f.write(f"  {capitalizeFirstLetter(removeExt(file))}Img,\n")
        
        # Export subdirectories
        for dir_name in dirs:
            f.write(f"  {capitalizeFirstLetter(dir_name)},\n")
        
        f.write("};\n")

# Start the recursive generation from assets_dir
generate_index(assets_dir)
