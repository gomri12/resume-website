#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download images
curl -o public/images/cloud-security-bg.jpg "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80"
curl -o public/images/tech-bg.jpg "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
curl -o public/images/code-bg.jpg "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80"
curl -o public/images/profile.jpg "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80"

# Make the script executable
chmod +x download-images.sh 