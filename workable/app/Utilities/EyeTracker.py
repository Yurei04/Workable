import cv2
import dlib
import numpy as np
import pyautogui

# Load Dlib's face detector and facial landmarks predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

# Function to extract eye regions
def get_eye_regions(landmarks, eye_indices):
    points = [landmarks.part(i) for i in eye_indices]
    return np.array([(p.x, p.y) for p in points], dtype=np.int32)

# Function to detect pupil position in an eye region
def detect_pupil(eye_frame):
    gray_eye = cv2.cvtColor(eye_frame, cv2.COLOR_BGR2GRAY)
    _, threshold_eye = cv2.threshold(gray_eye, 50, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(threshold_eye, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Find the largest contour, assumed to be the pupil
        max_contour = max(contours, key=cv2.contourArea)
        moments = cv2.moments(max_contour)
        if moments['m00'] != 0:
            cx = int(moments['m10'] / moments['m00'])  # Pupil x-coordinate
            cy = int(moments['m01'] / moments['m00'])  # Pupil y-coordinate
            return cx, cy
    return None

# Map gaze to screen coordinates
def map_gaze_to_screen(pupil_position, eye_region, screen_width, screen_height):
    (eye_x, eye_y, eye_w, eye_h) = cv2.boundingRect(eye_region)
    rel_x = (pupil_position[0] - eye_x) / eye_w
    rel_y = (pupil_position[1] - eye_y) / eye_h
    screen_x = int(rel_x * screen_width)
    screen_y = int(rel_y * screen_height)
    return screen_x, screen_y

# Start webcam
cap = cv2.VideoCapture(0)
screen_width, screen_height = pyautogui.size()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray_frame)

    for face in faces:
        landmarks = predictor(gray_frame, face)

        # Get eye regions
        left_eye_region = get_eye_regions(landmarks, range(36, 42))
        right_eye_region = get_eye_regions(landmarks, range(42, 48))

        # Extract eye frames
        left_eye_frame = frame[np.min(left_eye_region[:, 1]):np.max(left_eye_region[:, 1]),
                               np.min(left_eye_region[:, 0]):np.max(left_eye_region[:, 0])]
        right_eye_frame = frame[np.min(right_eye_region[:, 1]):np.max(right_eye_region[:, 1]),
                                np.min(right_eye_region[:, 0]):np.max(right_eye_region[:, 0])]

        # Detect pupil positions
        left_pupil = detect_pupil(left_eye_frame)
        right_pupil = detect_pupil(right_eye_frame)

        if left_pupil and right_pupil:
            # Map pupil positions to screen coordinates
            left_screen_pos = map_gaze_to_screen(left_pupil, left_eye_region, screen_width, screen_height)
            right_screen_pos = map_gaze_to_screen(right_pupil, right_eye_region, screen_width, screen_height)

            # Average gaze positions
            gaze_x = int((left_screen_pos[0] + right_screen_pos[0]) / 2)
            gaze_y = int((left_screen_pos[1] + right_screen_pos[1]) / 2)

            # Move mouse cursor
            pyautogui.moveTo(gaze_x, gaze_y)

        # Draw eye regions on the frame
        cv2.polylines(frame, [left_eye_region], True, (0, 255, 0), 1)
        cv2.polylines(frame, [right_eye_region], True, (0, 255, 0), 1)

    cv2.imshow("Eye Tracking", frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
