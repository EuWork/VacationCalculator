import React from "react";

export type ErrorComponentType = React.FC<{ error: Error }>;

interface ErrorBoundaryInterface {
  children: React.ReactNode;
  ErrorComponent: ErrorComponentType | undefined;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryInterface> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      const { ErrorComponent } = this.props;
      if (ErrorComponent) return <ErrorComponent error={error} />;
      if (DefaultErrorComponent) return <DefaultErrorComponent error={error} />;
      return <DefaultErrorText text={error.stack || error.message} />;
    }
    return this.props.children;
  }
}

function DefaultErrorText({ text }: { text: string }) {
  return <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
}

let DefaultErrorComponent: React.FC<{ error: Error }> | undefined;
export function setDefaultErrorComponent(component: React.FC<{ error: Error }>) {
  DefaultErrorComponent = component;
}
