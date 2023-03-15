import { ReactNode } from 'react';

export interface StandardFooterProps {
  children: ReactNode;
}

export function StandardFooter(props: StandardFooterProps) {
  const { children } = props;

  return (
    <footer className="bg-primary w-full relative">
      <div className="container mx-auto py-4">{children}</div>
      {/* 
          <div class="flex flex-col h-screen justify-between">
            <header class="h-10 bg-red-500">Header</header>
            <main class="mb-auto h-10 bg-green-500">Content</main>
            <footer class="h-10 bg-blue-500">Footer</footer>
          </div>
        
          <div class="flex flex-col h-screen">
            <div class="bg-red-500">header</div>
            <div class="bg-green-500 grow">content</div>
            <div class="bg-blue-500">footer</div>
          </div>
          
          <div class="min-h-screen">
            <div class="bg-red-500">Content, try to duplicate this line</div>
            <div class="sticky top-[100vh] bg-blue-500">Footer</div>
          </div> 
          */}
    </footer>
  );
}

export default StandardFooter;
