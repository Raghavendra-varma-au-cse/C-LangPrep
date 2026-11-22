#!/usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "======================================================================="
echo "  The Complete C Engineering Academy & Interactive Silicon Playground"
echo "  Single-Click Desktop Installer (macOS & Linux)"
echo "  Architected with lots of coffee by Raghavendra Varma"
echo "======================================================================="
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is required. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/3] Checking dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "[2/3] Building production package..."
export EXPORT="true"
npm run build

echo "[3/3] Creating Desktop Shortcut..."
DESKTOP_DIR="$HOME/Desktop"

if [ "$(uname)" == "Darwin" ]; then
    # macOS shortcut launcher
    SHORTCUT="$DESKTOP_DIR/The Complete C Academy.command"
    cat << 'EOF' > "$SHORTCUT"
#!/usr/bin/env bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
EOF
    echo "cd \"$DIR\"" >> "$SHORTCUT"
    echo "node scripts/serve-local.js" >> "$SHORTCUT"
    chmod +x "$SHORTCUT"
    echo "Created macOS desktop shortcut at: $SHORTCUT"
else
    # Linux .desktop file
    SHORTCUT="$DESKTOP_DIR/c-academy.desktop"
    cat << EOF > "$SHORTCUT"
[Desktop Entry]
Version=1.0
Type=Application
Name=The Complete C Academy
Comment=Interactive C Engineering Academy & Silicon Playground
Exec=node "$DIR/scripts/serve-local.js"
Icon=$DIR/build/icon.png
Terminal=true
Categories=Education;Development;
EOF
    chmod +x "$SHORTCUT"
    echo "Created Linux desktop shortcut at: $SHORTCUT"
fi

echo ""
echo "======================================================================="
echo "  Installation Complete! Launching Academy on http://localhost:3000..."
echo "======================================================================="
echo ""

node scripts/serve-local.js
