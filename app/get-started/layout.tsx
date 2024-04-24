
export default function Layout({
    user,
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
    user: any 
  }) {
    return (<>{children}</>)
  };