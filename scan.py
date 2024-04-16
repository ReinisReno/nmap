import socket
import re

# Function to extract the hostname from a URL
def extract_hostname(url):
    # Regex pattern to match the hostname in a URL
    pattern = r'^https?://(?:www\.)?(?P<hostname>[\w.-]+)'
    match = re.match(pattern, url)
    if match:
        return match.group('hostname')
    else:
        return None

# Function to scan a single port
def scan_port(hostname, port):
    try:
        # Create a socket object
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # Set a timeout for connection attempt
        sock.settimeout(1)
        # Attempt to connect to the specified host and port
        result = sock.connect_ex((hostname, port))
        # Check if the connection was successful
        if result == 0:
            print(f"Port {port} is open")
        # Close the socket
        sock.close()
    except Exception as e:
        print(f"Error scanning port {port}: {e}")

# Function to perform port scanning for a range of ports
def scan_ports(hostname, start_port, end_port):
    print(f"Scanning {hostname}...")
    for port in range(start_port, end_port + 1):
        scan_port(hostname, port)

if __name__ == "__main__":
    url = input("Enter the URL to scan (e.g., http://example.com): ")
    hostname = extract_hostname(url)
    if hostname:
        start_port = int(input("Enter the start port: "))
        end_port = int(input("Enter the end port: "))
        scan_ports(hostname, start_port, end_port)
    else:
        print("Invalid URL format")
