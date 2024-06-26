import { useState } from "react";
import { analytics } from "@/lib/segment";
import {
  trackEvent,
} from '@openpanel/nextjs';

function TruncatedText({ text, maxLength }: { text: string, maxLength: number }) {
    const [isTruncated, setIsTruncated] = useState(true);
  
    const handleToggle = () => {
        setIsTruncated(!isTruncated);
        // Track the action of expanding or collapsing the text
        analytics.track("Text Toggle", {
            action: isTruncated ? "expand" : "collapse",
            textLength: text.length,
            maxLength: maxLength
        });
        trackEvent("Text Toggle", {
            action: isTruncated ? "expand" : "collapse",
            textLength: text.length,
            maxLength: maxLength
        });        
    };

    const ToggleButton = ({ onClick, isExpanded }: { onClick: () => void, isExpanded: boolean }) => (
      <button
        onClick={onClick}
        className="text-black font-semibold text-xs" // Slightly reduced the boldness for a subtler look
        style={{ 
          display: "inline", // Changed to inline to appear next to the text
          marginLeft: "5px", // Adds a little space between the text and button
          verticalAlign: "baseline", // Aligns the button with the text baseline
          fontSize: "0.75rem", // Makes the button text a bit smaller
        }}
      >
        {isExpanded ? (
          <>
            View Less <span style={{ fontWeight: "bold" }}>▲</span>
          </>
        ) : (
          <>
            View More <span style={{ fontWeight: "bold" }}>▼</span>
          </>
        )}
      </button>
    );
  
    return (
      <div>
        <p style={{ display: "inline" }}>
          {isTruncated ? `${text.slice(0, maxLength)}...` : text}
        </p>
        <ToggleButton onClick={handleToggle} isExpanded={!isTruncated} />
      </div>
    );
}

export default TruncatedText;