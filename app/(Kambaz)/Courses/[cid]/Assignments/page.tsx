import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link">
            A1 - ENV + HTML
          </Link>
          <div className="wd-assignment-details">
            Multiple Modules | <b>Not available until May 6 at 12:00am</b> |{" "}
            <b>Due May 13 at 11:59pm</b> | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/2" className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-details">
            Multiple Modules | <b>Not available until May 13 at 12:00am</b> |{" "}
            <b>Due May 20 at 11:59pm</b> | 100 pts
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link href="/Courses/1234/Assignments/3" className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-details">
            Multiple Modules | <b>Not available until May 20 at 12:00am</b> |{" "}
            <b>Due May 27 at 11:59pm</b> | 100 pts
          </div>
        </li>
      </ul>
    </div>
  );
}
