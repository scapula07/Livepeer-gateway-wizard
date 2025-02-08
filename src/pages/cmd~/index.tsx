"use client";

import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
import { useRouter } from "next/router";


function XTerminal() {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const term = useRef<Terminal | null>(null);
  let userInput = ""; // Stores the user's current input line

  const router = useRouter();
  const { id,name,ip,url,cli } = router.query;
  const gateway_name=name as string
  const gateway_ip=ip as string
  const gateway_rpc_url=url as string
  const gateway_id =id as string
  const isCli = cli as boolean | string
  console.log(gateway_ip,gateway_name,typeof(isCli))

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    term.current = new Terminal({
      cursorBlink: true,
    });

    term.current.open(terminalRef.current);

    // Initialize WebSocket
    ws.current = new WebSocket(`ws://54.160.199.231:3004?gateway_name=${encodeURIComponent(gateway_name)}&gateway_ip=${encodeURIComponent(gateway_ip)}&gateway_rpc=${encodeURIComponent(gateway_rpc_url)}&gateway_id=${encodeURIComponent(gateway_id)}&cli=${encodeURIComponent(isCli)}`);

    ws.current.onmessage = (event) => {
      const data = event.data;
      console.log("Received from WebSocket:", data);
      term.current?.write(`\r\n${data}\r\n `); // New prompt after response
      userInput = ""; // Reset input buffer after command execution
    };

    // Handle keyboard input
    const keyListener = term.current.onKey(({ key, domEvent }) => {
      if (!term.current) return;

      if (domEvent.key === "Enter") {
        // Send user input to WebSocket
        ws.current?.send(userInput);
        term.current.write("\r\n"); // Move to next line
        userInput = ""; // Reset input buffer
      } else if (domEvent.key === "Backspace") {
        if (userInput.length > 0) {
          userInput = userInput.slice(0, -1);
          term.current.write("\b \b"); // Erase last character
        }
      } else {
        userInput += key; // Append to input buffer
        term.current.write(key); // Show input on terminal
      }
    });

    // Handle paste event
    async function handlePaste() {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        userInput += clipboardText;
        term.current?.write(clipboardText);
      }
    }

    // Attach custom key event handler for Ctrl+V (paste)
    term.current.attachCustomKeyEventHandler((e) => {
      if (e.ctrlKey && e.key === "v") {
        handlePaste();
        return false;
      }
      return true;
    });

    return () => {
      keyListener.dispose();
      ws.current?.close();
      term.current?.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef}
      style={{ height: "100vh", width: "100%", backgroundColor: "black" }}
    ></div>
  );
}

export default XTerminal;
