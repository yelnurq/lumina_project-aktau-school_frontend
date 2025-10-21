import { useState } from 'react';
import styles from './Tools.module.css';
import Editor from '../Editor/Editor';
import ColorPicker from '../DevTools/ColorPicker/ColorPicker';
import CodeToImage from '../DevTools/CodeToImage/CodeToImage';
import MetaPreviewer from '../MetaPreviewer/MetaPreviewer';
import DiffViewer from '../DevTools/DiffViewer/DiffViewer';
import ReportGenerator from '../DevTools/ReportGenerator/ReportGenerator';
import ImageOptimizer from '../DevTools/ImageOptimizer/ImageOptimizer';
import LoremIpsumGenerator from '../DevTools/LoremIpsumGenerator/LoremIpsumGenerator';

const toolsList = [
  {
    id: 'html',
    name: 'HTML/CSS/JS редактор',
    content: <Editor/>
  },
  {
  id: 'colorpicker',
  name: 'Color Picker',
  content: <ColorPicker />
}, 
 {
  id: 'codetoimage',
  name: 'Code To Image',
  content: <CodeToImage />
},
     {
  id: 'loremipsum',
      name: "Lorem Ipsum Generator",
      desc: "Быстрый текст-заглушка для макетов.",
    content: <LoremIpsumGenerator />
    },
    {
  id: 'imageoptimizer',
      name: "Image Optimizer",
      desc: "Загружайте картинку и получайте сжатую/веб-версию.",
      content: <ImageOptimizer />},
    {
  id: 'reportgenerator',
      name: "Report Generator",
      desc: "Анализ производительности сайта и генерация PDF отчётов.",
      content: <ReportGenerator />}
];

export default function Tools() {
  const [activeToolId, setActiveToolId] = useState(toolsList[0].id);

  const activeTool = toolsList.find(tool => tool.id === activeToolId);

  return (
    <div className={styles.toolsWrapper}>
      <aside className={styles.sidebar}>
        {toolsList.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveToolId(tool.id)}
            className={`${styles.sidebarItem} ${activeToolId === tool.id ? styles.active : ''}`}
          >
            {tool.name}
          </button>
        ))}
      </aside>

      <main className={styles.content}>
        {activeTool?.content}
      </main>
    </div>
  );
}
