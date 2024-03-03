import { useState } from "react";
import { PhotoDisplayProps } from "./PhotoDisplayProps";

interface userType {
  total_collections: number;
  total_promoted_photos: number;
  total_likes: number;
}
const PhotoDisplay = ({ photos, loading, headingText }: PhotoDisplayProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [imageInformation, setImageInfromation] = useState<userType>();
  const openModal = (photo: string, user: userType) => {
    setImageInfromation(user);
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto("");
  };

  return (
    <div>
      <h1 className="photo-title">{headingText}</h1>
      <div className="photo-list">
        {photos.map((photo, index) => {
          const { urls, alt_description, user } = photo;
          return (
            <div
              key={index}
              className="photo-item"
              onClick={() => openModal(photo.urls.small, user)}
            >
              <img src={urls.small} alt={alt_description} loading="lazy" />
            </div>
          );
        })}

        {loading && <p>Loading...</p>}
      </div>
      {selectedPhoto.length > 0 && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal">
            <img src={selectedPhoto} alt="Selected" />
            <div className="modal_information">
              <p>Collections: {imageInformation?.total_collections}</p>
              <p>Likes: {imageInformation?.total_likes}</p>
              <p>Promoted Photos: {imageInformation?.total_promoted_photos}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDisplay;
