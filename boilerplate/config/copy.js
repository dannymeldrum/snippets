module.exports = {
  "dev": {
    "files": [
      {
        "expand": true,
        "cwd": "./src/",
        "src": ["assets/**/*"],
        "dest": "./build/"
      },
      {
        "expand": true,
        "cwd": "./src/",
        "src": ["js/**/*"],
        "dest": "./build/assets/"
      }
    ]
  },
  "dist": {
    "files": [
      {
        "expand": true,
        "cwd": "./src/assets/",
        "src": "**/*",
        "dest": "./build/assets/"
      }
    ]
  }
}