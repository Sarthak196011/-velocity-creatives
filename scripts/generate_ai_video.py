import os
import sys
import time
import urllib.request

prompt = """A high-end, cinematic 20-second commercial for an AI video agency called Velocity Creatives. The video opens with sleek, futuristic neon-purple and cyan data lines morphing into the glowing lightning-bolt logo. Smooth, dynamic camera pans through a cutting-edge digital studio showing stunning, high-resolution product commercials being generated instantly on ultra-wide transparent displays. Professional studio lighting, ultra-modern corporate aesthetic, vibrant colors, premium quality, 4k resolution."""

output_path = r"c:\Users\sarthak\Downloads\velocity_ai_commercial_raw.mp4"

print("=" * 60)
print("VELOCITY CREATIVES — AI VIDEO GENERATION ENGINE")
print("=" * 60)

replicate_key = os.getenv("REPLICATE_API_TOKEN")
fal_key = os.getenv("FAL_KEY")
luma_key = os.getenv("LUMAAI_API_KEY")
runway_key = os.getenv("RUNWAYML_API_SECRET")

if not any([replicate_key, fal_key, luma_key, runway_key]):
    print("\n[!] To generate real neural text-to-video directly from the terminal,")
    print("    you need an API key from one of the following cloud providers:\n")
    print("    1. Replicate (Minimax Hailuo / Kling):  export REPLICATE_API_TOKEN=\"...\"")
    print("    2. Fal.ai (Kling 1.5 / Luma Ray):       export FAL_KEY=\"...\"")
    print("    3. Luma AI (Dream Machine):             export LUMAAI_API_KEY=\"...\"")
    print("    4. RunwayML (Gen-3 Alpha):              export RUNWAYML_API_SECRET=\"...\"\n")
    print("Once set in your terminal or .env.local, run this script to generate your video.")
    sys.exit(0)

# 1. Replicate (Minimax Hailuo or Kling)
if replicate_key:
    import replicate
    print("[*] Calling Minimax Video-01 via Replicate...")
    output = replicate.run(
        "minimax/video-01",
        input={"prompt": prompt, "prompt_optimizer": True}
    )
    video_url = str(output)
    print(f"[*] Downloading generated video from {video_url}...")
    urllib.request.urlretrieve(video_url, output_path)
    print(f"[✓] Saved video directly to: {output_path}")

# 2. Fal.ai
elif fal_key:
    import fal_client
    print("[*] Calling Kling 1.5 via Fal.ai...")
    result = fal_client.subscribe(
        "fal-ai/kling-video/v1.5/pro/text-to-video",
        arguments={"prompt": prompt, "aspect_ratio": "16:9", "duration": "10"}
    )
    video_url = result["video"]["url"]
    print(f"[*] Downloading generated video from {video_url}...")
    urllib.request.urlretrieve(video_url, output_path)
    print(f"[✓] Saved video directly to: {output_path}")

# 3. Luma AI
elif luma_key:
    from lumaai import LumaAI
    client = LumaAI()
    print("[*] Calling Luma Ray via Luma SDK...")
    gen = client.generations.create(prompt=prompt, aspect_ratio="16:9")
    while gen.state not in ["completed", "failed"]:
        time.sleep(3)
        gen = client.generations.get(id=gen.id)
        print(f"[*] Status: {gen.state}...")
    if gen.state == "completed":
        video_url = gen.assets.video
        urllib.request.urlretrieve(video_url, output_path)
        print(f"[✓] Saved video directly to: {output_path}")

# 4. RunwayML
elif runway_key:
    from runwayml import RunwayML
    client = RunwayML()
    print("[*] Calling Runway Gen-3 Alpha...")
    task = client.image_to_video.create(model='gen3a_turbo', prompt_text=prompt)
    print(f"[*] Task created: {task.id}")
