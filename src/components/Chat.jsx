import { Checkbox } from "@nextui-org/react";

export default function Chat() {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1 className="text-3xl font-bold underline">
          <Checkbox defaultSelected>Option</Checkbox>
        </h1>
      </div>
      <div className="chat-conversation">Greeting, My name is ...</div>
      <div className="chat-footer">Chat Footer</div>
      <div className="chat-footer-2">Chat Footer22</div>
    </div>
  );
}
