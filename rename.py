import os
import shutil
import sys


old_name = "emptybase"
name = sys.argv[1]
ext = [".js", ".css", ".html", ".py"]

to_rename = []

def check_rename(path):
    basename = os.path.basename(path)
    dirname = os.path.dirname(path)
    new_path = os.path.join(dirname, basename.replace(old_name, name))
    if path != new_path:
        to_rename.append((path, new_path))


shutil.copytree(old_name, name)


for directory in os.walk(name + "/"):

    for file in directory[2]:
        if os.path.splitext(file)[1] in ext:

            path = os.path.join(directory[0], file)
            content = open(path, "r", errors="ignore").read()
            content = content.replace(old_name, name)
            open(path, "w").write(content)
            check_rename(path)

    check_rename(directory[0])

to_rename = list(reversed(sorted(to_rename, key=lambda x: x[0].count("/"))))
#print(to_rename)
for x in to_rename:
    os.rename(x[0], x[1])
