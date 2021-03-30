import numpy as np

from PIL import Image
from flask import Flask, jsonify
from urllib import request
from io import BytesIO
from tensorflow import keras
from keras.preprocessing import image
from flask import request as req

import gc
gc.collect()
app = Flask(__name__)

@app.route('/predict/<crop>/<v_id>/<img_name>')
def predict(crop=None, v_id=None, img_name=None):
    gc.collect()
    url = "https://res.cloudinary.com/marcos-yash/image/upload/" + str(v_id) + "/" + str(img_name)
    res = request.urlopen(url).read()
    img = Image.open(BytesIO(res)).resize((64, 64))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = np.vstack([img])
    images = img / 255.0

    crop = str(crop)
    model = None
    result = None
    if crop == "Strawberry":
        model = keras.models.load_model('strawberryNew1.h5')
        classes = model.predict(images, batch_size=10)
        ar = np.array(classes[0]).tolist()
        max_value = max(ar)
        max_index = ar.index(max_value)

        if max_index == 0:
            result = {
                "Status": "Leaf Scorch",
                "Chances": ar[max_index] * 100,
                "Remedy": "Once common leaf spot develops on strawberry plants, the plants cannot be cured. If the disease is detected early, its development may be slowed using fungicides."
            }
            print(result)
        else:
            result = {
                "Status": "Healthy",
                "Chances": ar[max_index] * 100,
                "Remedy": "No Action Needed"
            }
    elif crop == "Tomato":
        model = keras.models.load_model('tomatoNew.h5')
        classes = model.predict(images, batch_size=10)
        ar = np.array(classes[0]).tolist()
        max_value = max(ar)
        max_index = ar.index(max_value)

        if max_index == 0:
            result = {
                "Status": "Bacterial Spot",
                "Chances": ar[max_index] * 100,
                "Remedy": "A plant with bacterial spot cannot be cured. Remove symptomatic plants from the field or greenhouse to prevent the spread of bacteria to healthy plants. Burn, bury or hot compost the affected plants and DO NOT eat symptomatic fruit"
            }
        elif max_index == 1:
            result = {
                "Status": "Early Blight",
                "Chances": ar[max_index] * 100,
                "Remedy": "Thoroughly spray the plant (bottoms of leaves also) with Bonide Liquid Copper Fungicide concentrate or Bonide Tomato & Vegetable"
            }
        elif max_index == 2:
            result = {
                "Status": "Late Blight",
                "Chances": ar[max_index] * 100,
                "Remedy": "Fungicides that contain maneb, mancozeb, chlorothanolil or fixed copper can help protect plants from late tomato blight."
            }
        elif max_index == 3:
            result = {
                "Status": "Leaf Mold",
                "Chances": ar[max_index] * 100,
                "Remedy": "The fungi Acremonium strictum, Dicyma pulvinata, Trichoderma harzianum or T. viride and Trichothecium roseum are antagonistic to M. fulva and could be used to reduce its spread"
            }
        elif max_index == 4:
            result = {
                "Status": "Septoria Spot",
                "Chances": ar[max_index] * 100,
                "Remedy": "Remove infected leaves immediately, and be sure to wash your hands and pruners thoroughly before working with uninfected plants."
            }
        elif max_index == 5:
            result = {
                "Status": "Spider Mites",
                "Chances": ar[max_index] * 100,
                "Remedy": "Spray infested plants with horticultural oil or insecticidal soap to kill spider mites"
            }
        elif max_index == 6:
            result = {
                "Status": "Target Spot",
                "Chances": ar[max_index] * 100,
                "Remedy": "Adequate crop spacing and pruning that helps to lessen leaf wetness should lessen the severity of target spot of tomato."
            }
        elif max_index == 7:
            result = {
                "Status": "Yellow Curl Leaves",
                "Chances": ar[max_index] * 100,
                "Remedy": "Immediately remove infected-looking plants and bury them"
            }
        elif max_index == 8:
            result = {
                "Status": "Mosaic Virus",
                "Chances": ar[max_index] * 100,
                "Remedy": "There are no cures for viral diseases such as mosaic once a plant is infected"
            }
        else:
            result = {
                "Status": "Healthy",
                "Chances": ar[max_index] * 100,
                "Remedy": "No Action Needed"
            }
    elif crop == "Potato":
        model = keras.models.load_model('newPotato.h5')
        classes = model.predict(images, batch_size=10)
        ar = np.array(classes[0]).tolist()
        max_value = max(ar)
        max_index = ar.index(max_value)
        if max_index == 0:
            result = {
                "Status": "Early Blight",
                "Chances": ar[max_index] * 100,
                "Remedy": " Fungicides with protectant and curative properties are registered for use against early blight on potato"
            }
        elif max_index == 1:
            result = {
                "Status": "Healthy",
                "Chances": ar[max_index] * 100,
                "Remedy": "No Action Needed"
            }
        else:
            result = {
                "Status": "Late Blight",
                "Chances": ar[max_index] * 100,
                "Remedy": "The severe late blight can be effectively managed with prophylactic spray of mancozeb"
            }
    elif crop == "Cherry":
        model = keras.models.load_model('cherryCropNew.h5')
        classes = model.predict(images, batch_size=10)
        ar = np.array(classes[0]).tolist()
        max_value = max(ar)
        max_index = ar.index(max_value)

        if max_index == 0:
            result = {
                "Status": "Powdery Mildew",
                "Chances": ar[max_index] * 100,
                "Remedy": "Potassium bicarbonate is a contact fungicide which kills the powdery mildew spores quickly."
            }
            print(result)
        else:
            result = {
                "Status": "Healthy",
                "Chances": ar[max_index] * 100,
                "Remedy": "No Action Needed"
            }
    elif crop == "Corn":
        model = keras.models.load_model('maizeNew.h5')
        classes = model.predict(images, batch_size=10)
        ar = np.array(classes[0]).tolist()
        max_value = max(ar)
        max_index = ar.index(max_value)
        if max_index == 0:
            result = {
                "Status": "Gray Leaf Spot",
                "Chances": ar[max_index] * 100,
                "Remedy": "Foliar fungicides can be used to manage gray leaf spot outbreaks."
            }
        elif max_index == 1:
            result = {
                "Status": "Common Rust",
                "Chances": ar[max_index] * 100,
                "Remedy": "Immediately spray with a fungicide"
            }
        elif max_index == 2:
            result = {
                "Status": "Northern Leaf Blight",
                "Chances": ar[max_index] * 100,
                "Remedy": "Fungicide applications reduces Northern Corn Leaf Blight damage and protects yield"
            }
        else:
            result = {
                "Status": "Healthy",
                "Chances": ar[max_index] * 100,
                "Remedy": "No Action Needed"
            }
    gc.collect()
    keras.backend.clear_session()
    result=jsonify(result)
    result.headers.add("Access-Control-Allow-Origin", "*")
    return result


@app.route("/")
def hello():
    gc.collect()
    return "Hello , it's Team S.A.Y"


if __name__ == "__main__":
    app.run()