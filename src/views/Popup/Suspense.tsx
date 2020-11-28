interface Props {
  condition: boolean;
  fallback?: JSX.Element;
}

const Suspense: React.FC<Props> = ({ children, condition, fallback = null }) => {
  if (condition) {
    return (
      <>
        {children}
      </>
    )
  }

  return fallback;
}

export { Suspense };
