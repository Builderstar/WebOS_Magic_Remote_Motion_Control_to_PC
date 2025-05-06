from http.server import SimpleHTTPRequestHandler
import socketserver
import json
import subprocess
from pymouse import PyMouse

class MyRequestHandler(SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers.get('content-length'))
        body = self.rfile.read(content_length)
        try:
            result = json.loads(body)
            x = round(result['x'] * 1.32)
            y = round(result['y'] * 1.32)
            cursor = PyMouse()
            cursor.move(x,y)
            #print(result)
            
            # Process the result as a normal Python dictionary
            self.wfile.write(bytes("Request has been processed", "utf-8"))
        except Exception as exc:
            self.wfile.write(bytes("Request has failed to process. Error: ?????", "utf-8"))

    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("This is the web-server for the webos motion control.", "utf-8"))

# Set up the server
PORT = 8050
Handler = MyRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()


