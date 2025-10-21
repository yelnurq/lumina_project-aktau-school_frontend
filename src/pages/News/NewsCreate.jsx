import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axiosConfig'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import styles from './NewsCreate.module.css'
import AdminHeader from '../../components/AdminHeader'
import './tiptap.css'
export default function NewsCreate() {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState(null)
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false) // блокировка кнопки

  useEffect(() => {
    axiosInstance.get('/api/admin/categories').then(res => setCategories(res.data)).catch(console.error)
    axiosInstance.get('/api/admin/tags').then(res => setTags(res.data)).catch(console.error)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ HTMLAttributes: { style: 'max-width: 100%; height: auto;' } }),
      Blockquote,
      CodeBlock,
    ],
    content: '',
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  })


  const calculateReadingTime = (html) => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || ''
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200) // ~200 слов в минуту
    return minutes
  }


const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (isSubmitting) return; // если уже нажали — ничего не делаем
  setIsSubmitting(true) // блокируем кнопку

  const readingTime = calculateReadingTime(content)

  const form = new FormData()
  form.append('title', title)
  form.append('content', content)
  form.append('excerpt', excerpt)
  form.append('reading_time', readingTime)
  form.append('category_id', categoryId)
  selectedTags.forEach(tag => form.append('tags[]', tag))
  if (image) form.append('image', image)

  try {
    await axiosInstance.post('/api/news', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    alert("Новость успешно добавлена!")
    setTitle('')
    setContent('')
    setCategoryId('')
    setSelectedTags([])
    setImage(null)
    setErrors(null)
    editor?.commands.setContent('')
  } catch (err) {
    setErrors(err.response?.data?.errors || null)
  } finally {
    setIsSubmitting(false) // снова разрешаем кнопку
  }
}

  const toggleTag = (id) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(tag => tag !== id) : [...prev, id]
    )
  }

  return (
      <>
          <AdminHeader/>
          <div className={styles.container}>
                       <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Добавить новость</h2>

      {/* Заголовок */}
      <div>
        <label className={styles.label}>Заголовок</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
        {errors?.title && <p className={styles.error}>{errors.title[0]}</p>}
      </div>
      <div>
        <label className={styles.label}>Краткое описание (excerpt)</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className={styles.input}
          placeholder="Краткое описание новости для предпросмотра..."
        />
        {errors?.excerpt && <p className={styles.error}>{errors.excerpt[0]}</p>}
      </div>

      {/* Контент */}
      <div>
        <label className={styles.label}>Контент</label>
        {editor && (
          <div className={styles.toolbar}>
            {[
              { label: 'B', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
              { label: <em>I</em>, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
              { label: <u>U</u>, action: () => editor.chain().focus().toggleUnderline?.().run(), active: editor.isActive('underline') },
              { label: 'S̶', action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike') },
              { label: 'H1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
              { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
              { label: '• List', action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
              { label: '1. List', action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
              { label: '❝ Quote', action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
              { label: '</>', action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
              { label: '🖼️', action: () => {
                const url = window.prompt('Введите URL изображения')
                if (url) editor.chain().focus().setImage({ src: url }).run()
              }, active: false },
            ].map((btn, i) => (
              <button key={i} type="button" onClick={btn.action}
                className={`${styles.button} ${btn.active ? styles.active : ''}`}>
                {btn.label}
              </button>
            ))}
          </div>
        )}
        <div className={styles.editor}><EditorContent editor={editor} /></div>
        {errors?.content && <p className={styles.error}>{errors.content[0]}</p>}
      </div>

      {/* Категория */}
      <div>
        <label className={styles.label}>Категория</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={styles.select}>
          <option value="">-- Выберите --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors?.category_id && <p className={styles.error}>{errors.category_id[0]}</p>}
      </div>

      {/* Теги */}
      <div>
        <label className={styles.label}>Теги</label>
        <div className={styles.tags}>
          {tags.map(tag => (
            <label key={tag.id} className={styles.tagItem}>
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTag(tag.id)}
              />
              {tag.name}
            </label>
          ))}
        </div>
        {errors?.tags && <p className={styles.error}>{errors.tags[0]}</p>}
      </div>

      {/* Изображение */}
      <div>
        <label className={styles.label}>Изображение</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className={styles.file}
        />
        {errors?.image && <p className={styles.error}>{errors.image[0]}</p>}
      </div>

<button type="submit" className={styles.submit} disabled={isSubmitting}>
  {isSubmitting ? 'Сохраняем...' : 'Сохранить'}
</button>
    </form>
          </div>
      </>
  )
}
