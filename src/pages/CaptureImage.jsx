import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCapturedImg } from "../redux/reducers/user";

const CaptureImage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { capturedImg } = useSelector((state) => state.user);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleNext = () => {
    if (!capturedImg) {
      alert("Upload your picture!");
      return;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }

    navigate("/preview");
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    dispatch(setCapturedImg(dataUrl));

    toast.success("Image captured successfully!");
  };

  useEffect(() => {
    let stream;
    if (!streamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          streamRef.current = stream;
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="form-container">
      <form>
        <video
          ref={videoRef}
          autoPlay
          style={{ width: "300px", margin: "1rem 0", borderRadius: "10px" }}
        />
        <button
          type="button"
          onClick={handleCapture}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            width: "100px",
            height: "70px",
            fontSize: "2rem",
            cursor: "pointer",
            borderRadius: "10px",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(0, 123, 255, 0.2)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          <FaCamera />
        </button>
        {capturedImg && (
          <span style={{ fontSize: "2rem", color: "green" }}>✔</span>
        )}
        <button className="nextBtn" type="button" onClick={handleNext}>
          Next
        </button>
      </form>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CaptureImage;
