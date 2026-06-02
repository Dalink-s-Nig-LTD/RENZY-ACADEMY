interface SuccessConfirmationProps {
  heading: string;
  message: string;
}

export function SuccessConfirmation({ heading, message }: SuccessConfirmationProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ textAlign: "center", padding: "3rem" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>&#x2705;</div>
        <h3>{heading}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}
