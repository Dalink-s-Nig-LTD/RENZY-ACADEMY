import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Index, AIAssistant, LiveChatWidget, EnrollForm } from "../index";

// Mock @tanstack/react-router to avoid router context errors
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (opts: Record<string, unknown>) => opts,
}));

// jsdom does not implement scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

describe("Index (main page)", () => {
  it("renders the hero section with title", () => {
    render(<Index />);
    expect(screen.getByText(/PMI-ACP Certification Is No Longer Optional/)).toBeInTheDocument();
  });

  it("renders navigation with logo text", () => {
    render(<Index />);
    const logos = screen.getAllByText(/RENZY/);
    expect(logos.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Enroll Now nav button", () => {
    render(<Index />);
    const enrollButtons = screen.getAllByText("Enroll Now");
    expect(enrollButtons.length).toBeGreaterThan(0);
  });

  it("renders hero stats (21%, 6, Global)", () => {
    render(<Index />);
    expect(screen.getByText("21%")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("Global")).toBeInTheDocument();
  });

  it("renders the benefits section", () => {
    render(<Index />);
    expect(screen.getByText("Deliver Projects Faster")).toBeInTheDocument();
    expect(screen.getByText("Lead Agile Transformation")).toBeInTheDocument();
  });

  it("renders the industries section", () => {
    render(<Index />);
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Banking & Finance")).toBeInTheDocument();
  });

  it("renders the audience section", () => {
    render(<Index />);
    expect(screen.getByText("Project Managers")).toBeInTheDocument();
    expect(screen.getByText("Scrum Masters")).toBeInTheDocument();
  });

  it("renders testimonials", () => {
    render(<Index />);
    expect(screen.getByText("Raul")).toBeInTheDocument();
    expect(screen.getByText("Aunty Esther")).toBeInTheDocument();
  });

  it("renders the footer with copyright", () => {
    render(<Index />);
    expect(screen.getByText(/© 2026 Renzy Academy/)).toBeInTheDocument();
  });

  it("shows the AI chat button", () => {
    render(<Index />);
    expect(screen.getByLabelText("Open AI Assistant")).toBeInTheDocument();
  });

  it("opens enrollment form when Enroll Now is clicked", async () => {
    const user = userEvent.setup();
    render(<Index />);
    const enrollButtons = screen.getAllByText("Enroll Now");
    await user.click(enrollButtons[0]);
    expect(screen.getByText("Enroll in PMI-ACP Training")).toBeInTheDocument();
  });

  it("opens AI assistant when chat button is clicked", async () => {
    const user = userEvent.setup();
    render(<Index />);
    await user.click(screen.getByLabelText("Open AI Assistant"));
    expect(screen.getByText("Renzy AI Assistant")).toBeInTheDocument();
  });
});

describe("AIAssistant", () => {
  it("renders initial greeting message", () => {
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);
    expect(screen.getByText(/I am Renzy's AI Assistant/)).toBeInTheDocument();
  });

  it("renders input and send button", () => {
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);
    expect(screen.getByPlaceholderText("Ask me anything...")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("renders Connect to Live Support button", () => {
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);
    expect(screen.getByText("Connect to Live Support")).toBeInTheDocument();
  });

  it("sends a message and gets a FAQ response", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);

    const input = screen.getByPlaceholderText("Ask me anything...");
    await user.type(input, "What is PMI-ACP certification?");
    await user.click(screen.getByText("Send"));

    // Advance past the 500ms setTimeout
    vi.advanceTimersByTime(600);

    await waitFor(() => {
      expect(screen.getByText(/Agile Certified Practitioner/)).toBeInTheDocument();
    });
    vi.useRealTimers();
  });

  it("shows fallback message for unknown queries", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);

    const input = screen.getByPlaceholderText("Ask me anything...");
    await user.type(input, "xyzzy");
    await user.click(screen.getByText("Send"));

    vi.advanceTimersByTime(600);

    await waitFor(() => {
      expect(screen.getByText(/I am not sure about that specific question/)).toBeInTheDocument();
    });
    vi.useRealTimers();
  });

  it("calls onConnectToLiveChat when button is clicked", async () => {
    const onConnect = vi.fn();
    const user = userEvent.setup();
    render(<AIAssistant onConnectToLiveChat={onConnect} />);
    await user.click(screen.getByText("Connect to Live Support"));
    expect(onConnect).toHaveBeenCalledOnce();
  });

  it("does not send empty messages", async () => {
    const user = userEvent.setup();
    render(<AIAssistant onConnectToLiveChat={vi.fn()} />);
    await user.click(screen.getByText("Send"));
    // Should still only have the initial greeting
    const messages = screen.getAllByText(/./);
    expect(screen.queryByText(/I am not sure/)).not.toBeInTheDocument();
  });
});

describe("LiveChatWidget", () => {
  it("renders the form fields", () => {
    render(<LiveChatWidget onClose={vi.fn()} />);
    expect(screen.getByText("Live Support")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe your question or concern...")).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClose = vi.fn();
    render(<LiveChatWidget onClose={onClose} />);

    await user.type(screen.getByPlaceholderText("Your name"), "John");
    await user.type(screen.getByPlaceholderText("your@email.com"), "john@test.com");
    await user.type(screen.getByPlaceholderText("Describe your question or concern..."), "Help");
    await user.click(screen.getByText("Send to Support Team"));

    expect(screen.getByText("Message Sent!")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("calls onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<LiveChatWidget onClose={onClose} />);
    const overlay = container.querySelector(".live-chat-modal")!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });
});

describe("EnrollForm", () => {
  it("renders enrollment form fields", () => {
    render(<EnrollForm onClose={vi.fn()} />);
    expect(screen.getByText("Enroll in PMI-ACP Training")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+234 ...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. Project Manager")).toBeInTheDocument();
  });

  it("submits the form and shows success message", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onClose = vi.fn();
    render(<EnrollForm onClose={onClose} />);

    await user.type(screen.getByPlaceholderText("Your full name"), "Jane Doe");
    await user.type(screen.getByPlaceholderText("your@email.com"), "jane@test.com");
    await user.type(screen.getByPlaceholderText("+234 ..."), "+2341234567");
    await user.click(screen.getByText("Submit Application"));

    expect(screen.getByText("Application Received!")).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("calls onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<EnrollForm onClose={onClose} />);
    const overlay = container.querySelector(".enroll-modal")!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders close button", () => {
    render(<EnrollForm onClose={vi.fn()} />);
    expect(screen.getByText("×")).toBeInTheDocument();
  });
});
