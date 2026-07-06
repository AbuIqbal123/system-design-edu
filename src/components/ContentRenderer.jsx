function renderInlineFormatting(text) {
  if (!text) return text;

  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code>$1</code>');

  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="content-block">
          <p>{renderInlineFormatting(block.value)}</p>
        </div>
      );

    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h2';
      return (
        <div className="content-block">
          <Tag>{renderInlineFormatting(block.value)}</Tag>
        </div>
      );
    }

    case 'list':
      return (
        <div className="content-block">
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>{renderInlineFormatting(item)}</li>
            ))}
          </ul>
        </div>
      );

    case 'code':
      return (
        <div className="code-block">
          <div className="code-block-header">
            <span className="code-block-lang">{block.language || 'code'}</span>
          </div>
          <pre>
            <code>{block.value}</code>
          </pre>
        </div>
      );

    case 'table':
      return (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i}>{renderInlineFormatting(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{renderInlineFormatting(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'image':
      return (
        <div className="image-block">
          <img src={block.src} alt={block.alt || ''} loading="lazy" />
          {block.caption && <p className="image-caption">{block.caption}</p>}
        </div>
      );

    case 'callout':
      return (
        <div className={`callout ${block.variant || 'info'}`}>
          <p>{renderInlineFormatting(block.value)}</p>
        </div>
      );

    case 'pros-cons':
      return (
        <div className="pros-cons">
          <div className="pros-list">
            <h4>✅ Pros</h4>
            <ul>
              {block.pros.map((pro, i) => (
                <li key={i}>{renderInlineFormatting(pro)}</li>
              ))}
            </ul>
          </div>
          <div className="cons-list">
            <h4>❌ Cons</h4>
            <ul>
              {block.cons.map((con, i) => (
                <li key={i}>{renderInlineFormatting(con)}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function ContentRenderer({ content = [] }) {
  return (
    <>
      {content.map((block, index) => (
        <ContentBlock key={index} block={block} />
      ))}
    </>
  );
}
