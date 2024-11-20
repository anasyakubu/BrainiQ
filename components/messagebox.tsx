import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Markdown from "./markdown";

type Props = {
  role: string;
  content: string;
};

const MessageBox = ({ role, content }: Props) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm">
        {/* {content} */}
        <Markdown text={content} />
      </CardContent>
      {role !== "user" && (
        <CardFooter className="border-t bg-muted/50 px-6 py-3 text-xs text-muted-foreground">
          Disclaimer: The information and assistance provided by AI Study Buddy
          are intended for educational purposes only and should not be
          considered as a substitute for professional advice or guidance. It is
          important to consult with appropriate experts for specific academic or
          professional needs.
        </CardFooter>
      )}
    </Card>
  );
};

export default MessageBox;
