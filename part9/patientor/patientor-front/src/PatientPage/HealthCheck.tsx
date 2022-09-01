import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { red, orange, yellow } from '@mui/material/colors';
import { HealthCheckEntry } from '../types';

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const checkHealth = (health: number) => {
    switch (health) {
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: orange[500] }} />;
      case 3:
        return <FavoriteIcon sx={{ color: red[500] }} />;
      default:
        return <FavoriteIcon color="success" />;
    }
  };

  return (
    <>
      <p>{entry.date} <MedicalServicesIcon/></p>
      <p>{entry.description}</p>
      <p>{checkHealth(entry.healthCheckRating)}</p>
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

export default HealthCheck;
