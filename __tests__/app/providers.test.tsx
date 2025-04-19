import React from 'react';
import { render } from '@testing-library/react';
import { Providers } from '@/app/providers';

// Mock the required components
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="session-provider">{children}</div>,
}));

jest.mock('sonner', () => ({
  Toaster: ({ className }: { className?: string }) => <div data-testid="toaster" className={className}></div>,
}));

jest.mock('@/components/modal/provider', () => ({
  ModalProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="modal-provider">{children}</div>,
}));

jest.mock('@/lib/hooks/use-toast', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="toast-provider">{children}</div>,
}));

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, attribute, defaultTheme, enableSystem, disableTransitionOnChange }: {
    children: React.ReactNode;
    attribute: string;
    defaultTheme: string;
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
  }) => (
    <div 
      data-testid="theme-provider" 
      data-attribute={attribute}
      data-default-theme={defaultTheme}
      data-enable-system={enableSystem ? 'true' : 'false'}
      data-disable-transition={disableTransitionOnChange ? 'true' : 'false'}
    >
      {children}
    </div>
  ),
}));

describe('Providers Component', () => {
  it('renders all providers correctly', () => {
    const { getByTestId } = render(
      <Providers>
        <div data-testid="children-content">Child Content</div>
      </Providers>
    );

    // Check that all providers are rendered
    expect(getByTestId('session-provider')).toBeInTheDocument();
    expect(getByTestId('toast-provider')).toBeInTheDocument();
    expect(getByTestId('theme-provider')).toBeInTheDocument();
    expect(getByTestId('modal-provider')).toBeInTheDocument();
    expect(getByTestId('children-content')).toBeInTheDocument();

    // Verify the Toaster components with different classes
    const toasters = document.querySelectorAll('[data-testid="toaster"]');
    expect(toasters.length).toBe(2);
    expect(toasters[0]).toHaveClass('dark:hidden');
    expect(toasters[1]).toHaveClass('hidden dark:block');

    // Verify ThemeProvider props
    const themeProvider = getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('data-attribute', 'class');
    expect(themeProvider).toHaveAttribute('data-default-theme', 'light');
    expect(themeProvider).toHaveAttribute('data-enable-system', 'true');
    expect(themeProvider).toHaveAttribute('data-disable-transition', 'true');
  });
});