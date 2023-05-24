import React from 'react'
import { mdlContent, mdlContentTag } from '../../../types/Type'

export interface IContentTagRemoveButton{
    newContent: mdlContent;
    setNewContent: React.Dispatch<React.SetStateAction<mdlContent>>;
    contentTagId: string;
}

const ContentTagRemoveButton: React.FC<IContentTagRemoveButton> = ({newContent, setNewContent, contentTagId}) => {

    const removeContentTag = (contentTagId: string, e: React.MouseEvent<HTMLElement>)=>{
        e.preventDefault();
        let newTags = newContent.contentTags.filter((contentTag: mdlContentTag)=>{
            if(contentTag.id!==contentTagId)
            {
                return contentTag;
            }
        })
        let content = {
            id: newContent.id,
            contentName: newContent.contentName,
            createdDate: newContent.createdDate,
            updatedDate: newContent.updatedDate,
            createdPerson: newContent.createdPerson,
            updatedPerson: newContent.updatedPerson,
            version: newContent.version,
            content: newContent.content,
            contentTags: newTags,
            projectId: newContent.projectId,

        }
            setNewContent(content);
        }

  return (
    <button className='btn btn-danger btn-sm' onClick={(e)=>removeContentTag(contentTagId, e)}>X</button>
  )
}

export default ContentTagRemoveButton