import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
    <h1>Name: Aryan Rakeshbhai Shah</h1>
    <strong>Source Code: </strong>{" "}
    <br />
      <a
        href="https://github.com/aryanshah295/kambaz-next-js"
      >
        Frontend GitHub Repository
      </a>
      <br />
      <a
        href="https://github.com/aryanshah295/kambaz-node-server-app"
      >
        Backend GitHub Repository
      </a>
      <br />
      <a
        href="https://kambaz-node-server-app-1-dh4n.onrender.com"
      >
        Server
      </a>
     <h1>Labs</h1>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
         <Link href="/Labs/Lab4" id="wd-lab4-link">
           Lab 4</Link>
       </li>
       <li>
         <Link href="/Labs/Lab5" id="wd-lab5-link">
           Lab 5</Link>
       </li>
     </ul>
   </div>
);}
