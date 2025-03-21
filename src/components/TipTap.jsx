import React from 'react'
import {EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Popover } from "@headlessui/react";
import { useState,useEffect } from 'react'
import '../styles/tiptap.css'

const VARIABLES = [
    { id: 'user_name', label: 'User Name', value: '{{user_name}}' },
    { id: 'company', label: 'Company', value: '{{company}}' },
    { id: 'email', label: 'Email Address', value: '{{email}}' },
    { id: 'date', label: 'Current Date', value: '{{date}}' },
    { id: 'subscription_plan', label: 'Subscription Plan', value: '{{subscription_plan}}' },
    { id: 'account_balance', label: 'Account Balance', value: '{{account_balance}}' },
    { id: 'support_phone', label: 'Support Phone', value: '{{support_phone}}' },
    { id: 'website_url', label: 'Website URL', value: '{{website_url}}' }
  ]
  

const extensions=[
    StarterKit
]
const content=''
function TipTap() {
    const [showPopover, setShowPopover] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });

    const editor=useEditor({
        extensions,
        content
    })
    
    useEffect(() => {
        if (!editor) return;
    
        const handleUpdate = () => {
          const { state } = editor;
          const text = state.doc.textBetween(0, state.selection.from, " ");
          if (text.endsWith("{{")) {
            const { from } = editor.state.selection;
            const coords = editor.view.coordsAtPos(from);
            setAnchorPosition({ top: coords.top + 30, left: coords.left });
            setShowPopover(true);
          } else {
            setShowPopover(false);
          }
        };
    
        editor.on("update", handleUpdate);
        return () => editor.off("update", handleUpdate);
      }, [editor]);
    
      const insertVariable = (variable) => {
        if (!editor) return;
    
        editor.chain().focus().deleteRange({ from: editor.state.selection.from - 2, to: editor.state.selection.from }).insertContent(variable).run();
        setShowPopover(false);
      };
    

  return (
    <div className='main'>
      <div className='head'>
        <button  onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}>B</button>
           <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          Redo
        </button>
      </div>
      <div >
        <EditorContent   className='editor' editor={editor}></EditorContent>
        {showPopover && (
         <Popover style={{ top: anchorPosition.top, left: anchorPosition.left }}>
         {VARIABLES.map(({ id, label, value }) => (
           <button key={id} onClick={() => insertVariable(value)} >
             {label}
           </button>
         ))}
       </Popover>
      )}
      </div>
      <div className='save'>
        <button className='save-btn'>Save</button>
     </div>
    </div>
  )
}

export default TipTap
