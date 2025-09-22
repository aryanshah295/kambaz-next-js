export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />

      <label htmlFor="wd-description">Description</label><br />
      <textarea id="wd-description" rows={6} cols={60}>
        The assignment is available online. Submit a link to the landing page of your web
        application running on Netlify. The landing page should include the following:
        Your full name and section, links to each of the lab assignments, link to the
        Kanbas application, links to all relevant source code repositories. The Kanbas
        application should include a link to navigate back to the landing page.
      </textarea>

      <br /><br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade-display">Display Grade as</label>
            </td>
            <td>
              <select id="wd-grade-display" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label>Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ONPAPER">On Paper</option>
                <option value="EXTERNAL">External Tool</option>
              </select>
              <br />
              <label><input type="checkbox" /> Text Entry</label><br />
              <label><input type="checkbox" /> Website URL</label><br />
              <label><input type="checkbox" /> Media Recordings</label><br />
              <label><input type="checkbox" /> Student Annotation</label><br />
              <label><input type="checkbox" /> File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label>Assign to</label>
            </td>
            <td>
              <input defaultValue="Everyone" />
              <br /><br />
              <label>Due</label><br />
              <input type="date" defaultValue="2024-05-13" /><br /><br />

              <label>Available from</label><br />
              <input type="date" defaultValue="2024-05-06" /><br /><br />

              <label>Until</label><br />
              <input type="date" defaultValue="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
