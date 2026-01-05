import { Info, Lightbulb, ShieldAlert, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export function InfoCallout({ children }: React.PropsWithChildren) {
  return (
    <Alert className="callout">
      <Info />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function TipCallout({ children }: React.PropsWithChildren) {
  return (
    <Alert className="callout bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-0">
      <Lightbulb className="stroke-blue-900 dark:stroke-blue-400"/>
      <AlertTitle className="text-blue-900 dark:text-foreground">提示</AlertTitle>
      <AlertDescription className="text-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function WarningCallout({ children }: React.PropsWithChildren) {
  return (
    <Alert className="callout bg-amber-100 border-yellow-300 dark:bg-yellow-950/80 dark:border-yellow-900">
      <TriangleAlert className="stroke-yellow-900 dark:stroke-yellow-500"/>
      <AlertTitle className="text-yellow-900 dark:text-foreground">注意</AlertTitle>
      <AlertDescription className="text-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}

export function ErrorCallout({ children }: React.PropsWithChildren) {
  return (
    <Alert className="callout bg-red-100 border-red-300 dark:bg-red-950 dark:border-red-900">
      <ShieldAlert className="stroke-red-900 dark:stroke-red-700"/>
      <AlertTitle className="text-red-900 dark:text-foreground">警告</AlertTitle>
      <AlertDescription className="text-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}
