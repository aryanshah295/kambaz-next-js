export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-publish">
        <option selected value="publish-all">Publish All</option>
        <option value="publish-modules">Publish Modules</option>
      </select>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
  <div className="wd-title">Week 2</div>
  <ul className="wd-lessons">
    <li className="wd-lesson">
      <span className="wd-title">LEARNING OBJECTIVES</span>
      <ul className="wd-content">
        <li className="wd-content-item">Understand the basics of HTML</li>
        <li className="wd-content-item">Learn how to structure a web page</li>
        <li className="wd-content-item">Use headings, paragraphs, and lists</li>
      </ul>
    </li>
    <li className="wd-lesson">
      <span className="wd-title">ASSIGNMENTS</span>
      <ul className="wd-content">
        <li className="wd-content-item">Build a simple webpage using HTML</li>
      </ul>
    </li>
  </ul>
</li>

    <li className="wd-module">
      <div className="wd-title">Week 3</div>
      <ul className="wd-lessons">
        <li className="wd-lesson">
          <span className="wd-title">LEARNING OBJECTIVES</span>
          <ul className="wd-content">
            <li className="wd-content-item">Learn the basics of CSS</li>
            <li className="wd-content-item">Apply styles to HTML elements</li>
            <li className="wd-content-item">Understand classes, IDs, and selectors</li>
          </ul>
        </li>
        <li className="wd-lesson">
          <span className="wd-title">ASSIGNMENTS</span>
          <ul className="wd-content">
            <li className="wd-content-item">Style your Week 2 webpage with CSS</li>
          </ul>
        </li>
      </ul>
    </li>
      </ul>
    </div>
);}
