#!/bin/sh

# Use default 'prod' if MODE is not set
MODE="${MODE:-prod}"

echo "[!] Running in $MODE mode"
python3 app.py "$MODE"

# Start the application
uwsgi --ini /app/uwsgi.ini
