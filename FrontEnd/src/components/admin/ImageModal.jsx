const ImageModal = ({ src, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1000,
      }} onClick={onClose}>
        <img src={src} style={{
          maxHeight: '80%',
          maxWidth: '80%',
          border: '5px solid white',
        }} alt="Enlarged" onClick={(e) => e.stopPropagation()} />
      </div>
    );
  };
  