---
title: Shell Scripting and Automation
subject: Linux
category: Systems & Tools
difficulty: medium
importance: high
tags:
  - linux
  - bash
  - scripting
  - automation
  - cron
---

# Shell Scripting and Automation in Linux

Shell scripting allows system administrators and DevOps engineers to automate repetitive maintenance tasks, parse logs, orchestrate deployments, and monitor system health.

---

## 1. Core Bash Fundamentals

A shell script begins with a **Shebang** (`#!/bin/bash` or `#!/usr/bin/env bash`), which instructs the kernel which interpreter to use when executing the file.

```bash
#!/usr/bin/env bash
# Robust bash boilerplate:
# -e: Exit immediately if a command exits with a non-zero status
# -u: Treat unset variables as an error and exit
# -o pipefail: Pipeline exit status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

readonly BACKUP_DIR="/var/backups/app"
readonly TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
```

---

## 2. Variables, Conditionals, and Loops

### Variables and Quotes
```bash
# Variables (no spaces around '=')
DB_NAME="production_db"
COUNT=5

# Double quotes allow variable expansion; single quotes treat text literally
echo "Backing up ${DB_NAME} to ${BACKUP_DIR}_${TIMESTAMP}"
echo 'Literal text: ${DB_NAME}'
```

### Conditionals and File Testing
```bash
if [[ -d "$BACKUP_DIR" ]]; then
    echo "Backup directory exists: $BACKUP_DIR"
elif [[ ! -e "$BACKUP_DIR" ]]; then
    echo "Creating directory..."
    mkdir -p "$BACKUP_DIR"
else
    echo "Error: $BACKUP_DIR is not a directory!" >&2
    exit 1
fi

# Numerical comparisons: -eq, -ne, -lt, -le, -gt, -ge
if [[ $COUNT -ge 5 ]]; then
    echo "Count reached threshold"
fi
```

### Loops and Argument Handling
```bash
# Iterating over files safely
for file in /var/log/nginx/*.log; do
    if [[ -f "$file" ]]; then
        gzip -c "$file" > "${BACKUP_DIR}/$(basename "$file")_${TIMESTAMP}.gz"
    fi
done

# While read loop for parsing line by line
while IFS= read -r line; do
    echo "Processing line: $line"
done < "/etc/hosts"
```

---

## 3. Exit Codes and Error Traps

Every command returns an exit code between `0` (Success) and `1-255` (Failure).

```bash
# Custom cleanup using TRAP
cleanup() {
    echo "Cleaning up temporary files..."
    rm -rf /tmp/scratch_$$
}
trap cleanup EXIT ERR SIGINT SIGTERM

mkdir -p /tmp/scratch_$$
```

---

## 4. Cron Job Scheduling

The Linux **cron** daemon executes scheduled tasks based on the `crontab` format:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (0 to 6 are Sunday to Saturday)
│ │ │ │ │
* * * * * command_to_execute
```

### Practical Crontab Examples:
- `0 2 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1` (Every day at 2:00 AM)
- `*/15 * * * * /usr/local/bin/healthcheck.sh` (Every 15 minutes)
- `0 0 1 * * /usr/local/bin/monthly_cleanup.sh` (First day of every month at midnight)

---

## 5. Practical Interview Questions

### Q1: What is the difference between `set -e` and `set -o pipefail`?
- `set -e` aborts the script if any simple command fails. However, in a pipeline like `failing_cmd | grep "foo"`, `set -e` only checks the exit code of `grep`. If `grep` succeeds (0), the failure of `failing_cmd` is silently ignored.
- `set -o pipefail` forces the pipeline's return code to be the failure code of the earliest failing command in the pipe, preventing silent pipeline failures.

### Q2: What is the difference between `$$`, `$?`, `$#`, and `$@`?
- `$$`: Process ID (PID) of the current script.
- `$?`: Exit status of the most recently executed command.
- `$#`: Total count of positional arguments passed to the script.
- `$@`: Array-like expansion of all positional arguments (`"$@"` preserves argument spaces).

### Q3: When should you use `[[ ... ]]` over `[ ... ]`?
`[[ ... ]]` is a Bash keyword that supports regex matching (`=~`), pattern matching (`==`), logical operators (`&&` and `||` directly inside), and does not undergo word-splitting or pathname expansion, preventing syntax errors when variables are empty or contain spaces.

---

## 6. Key Terminology & Revision Notes

- **Shebang (`#!`)**: Kernel interpreter directive located on line 1.
- **Pipefail**: Shell option ensuring pipelines fail if intermediate stages fail.
- **IFS (Internal Field Separator)**: Determines how Bash splits strings into words (default: space, tab, newline).
- **Subshell `$(command)`**: Executes command in a child process and returns its standard output.
