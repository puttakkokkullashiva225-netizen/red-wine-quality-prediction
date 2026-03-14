import streamlit as st
import pickle
import pandas as pd

st.set_page_config(
    page_title="Wine Quality Prediction",
    page_icon="🍷",
    layout="wide"
)

st.markdown("## 🍷 Wine Quality Prediction System")
st.markdown("Machine Learning model using **Random Forest Classifier**")
st.markdown("---")

tab1, tab2, tab3 = st.tabs(["🏠 Home", "📊 Prediction", "ℹ About"])

with open("model.pkl", "rb") as file:
    model = pickle.load(file)

# ---------------- HOME ----------------
with tab1:
    st.subheader("Welcome")
    st.write("""
    This application predicts whether a wine is **Good** or **Bad** quality.
    All chemical properties must be entered correctly.
    """)

# ---------------- PREDICTION ----------------
with tab2:

    st.subheader("Enter Wine Chemical Properties")

    col1, col2 = st.columns(2)

    with col1:
        fixed_acidity = st.number_input("Fixed Acidity", min_value=0.0)
        volatile_acidity = st.number_input("Volatile Acidity", min_value=0.0)
        citric_acid = st.number_input("Citric Acid", min_value=0.0)
        residual_sugar = st.number_input("Residual Sugar", min_value=0.0)
        chlorides = st.number_input("Chlorides", min_value=0.0)
        free_sulfur_dioxide = st.number_input("Free Sulfur Dioxide", min_value=0.0)

    with col2:
        total_sulfur_dioxide = st.number_input("Total Sulfur Dioxide", min_value=0.0)
        density = st.number_input("Density", min_value=0.0)
        pH = st.number_input("pH", min_value=0.0)
        sulphates = st.number_input("Sulphates", min_value=0.0)
        alcohol = st.number_input("Alcohol", min_value=0.0)

    if st.button("🔍 Predict Quality", use_container_width=True):

        inputs = [
            fixed_acidity, volatile_acidity, citric_acid,
            residual_sugar, chlorides, free_sulfur_dioxide,
            total_sulfur_dioxide, density, pH,
            sulphates, alcohol
        ]

        # Check if all values entered
        if any(value == 0 for value in inputs):
            st.warning("⚠ Please enter all chemical values. Zero values may indicate missing input.")

        # Basic logical validations
        elif pH > 14:
            st.error("❌ pH value cannot be greater than 14.")

        elif density > 2:
            st.error("❌ Density value seems unrealistic. Please check.")

        else:
            input_data = pd.DataFrame([{
                "fixed acidity": fixed_acidity,
                "volatile acidity": volatile_acidity,
                "citric acid": citric_acid,
                "residual sugar": residual_sugar,
                "chlorides": chlorides,
                "free sulfur dioxide": free_sulfur_dioxide,
                "total sulfur dioxide": total_sulfur_dioxide,
                "density": density,
                "pH": pH,
                "sulphates": sulphates,
                "alcohol": alcohol
            }])

            prediction = model.predict(input_data)

            st.markdown("---")

            if prediction[0] == 1:
                st.success("✅ GOOD QUALITY WINE")
            else:
                st.error("❌ BAD QUALITY WINE")

# ---------------- ABOUT ----------------
with tab3:
    st.subheader("About This Project")
    st.write("""
    ✔ Model: Random Forest  
    ✔ Binary Classification  
    ✔ Deployed using Streamlit  

    Validation is applied to ensure correct input before prediction.
    """)
