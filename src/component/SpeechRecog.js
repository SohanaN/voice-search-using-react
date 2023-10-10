import * as React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Mic from '@mui/icons-material/Mic';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import MicOffIcon from '@mui/icons-material/MicOff';
import './VoiceSearch/VoiceSearch.css';

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SpeechRecog() {
    //  modal start (SN)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //  modal end (SN)

    // Speech Recognition start (SN)
    const commands = [
        {
            command: 'open *',
            callback: (site) => {
                window.open('http://' + site)
            }
        },
        {
            command: 'change bg colour to *',
            callback: (color) => {
                document.body.style.background = color;
            }
        }
    ]
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    // Speech Recognition start (SN)
    return (
        <div>
            <Grid container justifyContent="center"
                sx={{ mt: "100px" }}
            >
                <p>Inside modal</p>
                <Button onClick={handleOpen}><Mic /></Button>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modal_style}>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <p>{transcript}</p>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Button onClick={resetTranscript}>x</Button>
                    </Paper>
                    <Typography fontSize="10px" mt={2}>
                        Microphone: {listening ? <Mic /> : <MicOffIcon />}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Speak Now
                        </Typography>
                        <Typography id="modal-modal-description" className='snMic' sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Mic />
                        </Typography>
                        <Button onClick={SpeechRecognition.startListening}>Start</Button>
                        <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
    // Speech Recognition start (SN)
}
