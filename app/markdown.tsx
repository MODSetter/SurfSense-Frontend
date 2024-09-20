import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { useTheme } from 'next-themes'

export default function MarkDownTest({source} : {source: string}) {
  const { theme } = useTheme()
  if(theme === "light"){
    return (
      <MarkdownPreview className='bg-transparent' source={source} style={{ padding: 16 }}   wrapperElement={{  "data-color-mode": "light" }}/>
    )
  }else{
    return (
      <MarkdownPreview className='bg-transparent' source={source} style={{ padding: 16 }}   wrapperElement={{  "data-color-mode": "dark" }}/>
    )
  }

}