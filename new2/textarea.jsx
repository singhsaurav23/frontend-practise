import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill styles
import EmojiPicker from 'emoji-picker-react'; // Emoji picker
import { Mention, MentionsInput } from 'react-mentions'; // Mentions
import 'react-mentions/lib/style.css'; // Mentions styles

const RichTextArea = () => {
    const [content, setContent] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const quillRef = useRef(null);

    // Character limit
    const MAX_CHARACTERS = 500;
    const charactersRemaining = MAX_CHARACTERS - content.length;

    // Handle text change
    const handleChange = (value) => {
        if (value.length <= MAX_CHARACTERS) {
            setContent(value);
        }
    };

    // Add emoji to the text area
    const handleEmojiClick = (emojiObject) => {
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertText(range.index, emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    // Handle mentions
    const handleMention = (id, display) => {
        return `@${display}`;
    };

    // Fetch mention suggestions (e.g., from an API)
    const fetchSuggestions = (query, callback) => {
        const users = [
            { id: '1', display: 'John Doe' },
            { id: '2', display: 'Jane Smith' },
            { id: '3', display: 'Alice Johnson' },
        ];
        const filteredUsers = users.filter((user) =>
            user.display.toLowerCase().includes(query.toLowerCase())
        );
        callback(filteredUsers);
    };

    return (
        <div className="rich-text-area">
            {/* Rich Text Editor */}
            <ReactQuill
                ref={quillRef}
                value={content}
                onChange={handleChange}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // Text formatting
                        ['blockquote', 'code-block'], // Blocks
                        [{ header: 1 }, { header: 2 }], // Headers
                        [{ list: 'ordered' }, { list: 'bullet' }], // Lists
                        ['link', 'image', 'video'], // Media
                        ['clean'], // Remove formatting
                    ],
                }}
                placeholder="Write something..."
            />

            {/* Emoji Picker */}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                ?? Add Emoji
            </button>
            {showEmojiPicker && (
                <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}

            {/* Mentions */}
            <div className="mentions-section">
                <MentionsInput
                    value={content}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Mention someone using @"
                >
                    <Mention
                        trigger="@"
                        data={fetchSuggestions}
                        renderSuggestion={(suggestion) => <div>{suggestion.display}</div>}
                        displayTransform={handleMention}
                    />
                </MentionsInput>
            </div>

            {/* Character Count */}
            <div className="character-count">
                {charactersRemaining} characters remaining
            </div>

            {/* Preview Content */}
            <div className="preview">
                <h3>Preview:</h3>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default RichTextArea;

                    .rich - text - area {
    max - width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border - radius: 5px;
}

.emoji - picker {
    position: absolute;
    z - index: 1000;
}

.mentions - section {
    margin - top: 20px;
}

.mentions - section.react - mentions__control {
    width: 100 %;
    padding: 8px;
    border: 1px solid #ccc;
    border - radius: 4px;
}

.mentions - section.react - mentions__suggestions {
    border: 1px solid #ccc;
    background: white;
    border - radius: 4px;
}

.mentions - section.react - mentions__suggestion {
    padding: 5px;
    cursor: pointer;
}

.mentions - section.react - mentions__suggestion--focus {
    background - color: #f0f0f0;
}

.character - count {
    margin - top: 10px;
    font - size: 0.9em;
    color: #666;
}

.preview {
    margin - top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border - radius: 4px;
    background - color: #f9f9f9;
}