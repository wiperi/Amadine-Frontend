#!/bin/bash

# Prompt user for SSH key store path
read -p "Enter the path to store the SSH key (default: ~/.ssh): " ssh_path
ssh_path=${ssh_path:-~/.ssh}

# List all public keys in the SSH key store path
echo "Existing public keys:"
ls -l "$ssh_path"/*.pub

# Ensure the directory exists
mkdir -p "$ssh_path"

# Prompt user for SSH key name
read -p "Enter the name for your new SSH key: " key_name

# Generate SSH key using the following options:
# -t ed25519: Specifies the type of key to create (Ed25519, a modern, secure, and fast algorithm)
# -f "$ssh_path/$key_name": Sets the filename of the key file (full path constructed from user input)
# -N "": Sets an empty passphrase for the key (not recommended for production use)
ssh-keygen -t ed25519 -f "$ssh_path/$key_name" -N ""

# Display public key to user
echo "Here is your public SSH key:"
cat "$ssh_path/$key_name.pub"

# Add the public key to the SSH agent
echo "Adding the public key to the SSH agent..."
# Start the SSH agent
eval "$(ssh-agent -s)"
# Add the public key to the SSH agent
ssh-add "$ssh_path/$key_name"
# Display the SSH agent status
echo "SSH agent status:"
ssh-add -l
