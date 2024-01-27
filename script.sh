#!/bin/bash

# Local folder path
local_folder="/home/jayendra/Work/IDS/Denave_Frontend"


# Server 1 details
server1_user="jayendra-singh"
server1_ip="10.1.0.18"
server1_port="2244"  # Replace with the actual SSH port of Server 1
server1_folder="/home/jayendra-singh"

# Server 2 details
server2_user="goadmin"
server2_ip="10.1.0.6"
server2_port="2244"  # Replace with the actual SSH port of Server 2
server2_folder="/home/goadmin"

# Copy folder from local system to Server 1
echo "Copying folder to Server 1..."
scp -r -P "$server1_port" "$local_folder" "$server1_user"@"$server1_ip":"$server1_folder"

# Copy folder from Server 1 to Server 2
echo "Copying folder from Server 1 to Server 2..."
ssh -p "$server1_port" "$server1_user"@"$server1_ip" "scp -r -P \"$server2_port\" \"$server1_folder\" \"$server2_user\"@\"$server2_ip\":\"$server2_folder\""

echo "Folder copied successfully from your local system to Server 1 and then from Server 1 to Server 2."
