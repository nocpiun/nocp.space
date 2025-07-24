import { Page } from "@/components/page";

export default function Donate() {
  return (
    <Page title="打赏" className="*:text-center">
      <p>打赏能给予我创造和开发的动力，如果你对我的项目感到满意，欢迎打赏！😎</p>
      <img
        className="mt-10 ml-auto mr-auto shadow-md"
        src="/static/donate.jpg"
        alt="donate"
        width={384}
        height={384}/>
    </Page>
  );
}
