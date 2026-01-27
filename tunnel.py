import subprocess
import time

print("\n" + "="*60)
print("Starting tunnel with Cloudflare Tunnel (Warp)...")
print("="*60 + "\n")

# Start cloudflared tunnel
try:
    result = subprocess.run([
        'wsl', 'curl', '-L', 'https://pkg.cloudflare.com/cloudflare-release.key', '|', 'sudo', 'apt-key', 'add', '-'
    ], capture_output=True, text=True)
    
    print("⚠️  To share with your mom, use one of these methods:")
    print("\n1️⃣  LOCAL NETWORK (Same WiFi):")
    print("   → http://10.24.181.143:8000")
    print("\n2️⃣  DIFFERENT NETWORK (Recommended):")
    print("   → Share your public IP + port using online services")
    print("   → Or use Cloudflare Tunnel (free, requires cloudflared)")
    print("\n" + "="*60)
    print("\nFor now, share this link if she's on same WiFi:")
    print("   http://10.24.181.143:8000")
    print("\n" + "="*60 + "\n")
    
except Exception as e:
    print(f"Setup info: {e}")
