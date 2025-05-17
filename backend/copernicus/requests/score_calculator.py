# user inputs
# alergii: astma: boolean, pollen_allergy, other_respiratory_issues,
#          cardiovascular_problems, skin_disease
# levels_of_disease: astma(1-4); pollen_allergy(1-4), other_respiratory_issues: boolean
# Data: UV, Green areas, City density, Ozone, Air pollution, Pollen density (5 types of pollen)
# astma multipliers:
# UV: 0
# Green areas: 0
# City density: 0.1
# Ozone: 0.15
# Air pollution: 0.2
# Pollen density: 1.025 * pollen_density
# pollen_allergy multipiers:
# UV: 0
# Green areas: 0.3
# City density: 0.05
# Ozone: 0.10
# Air pollution: 0.15
# Pollen density: 1.05 * pollen_density
# other_respiratory_issues = asthma
# UV: 0
# Green areas: 0
# City density: 0.12
# Ozone: 0.15
# Air pollution: 0.25
# Pollen_density: 0
# skin_diseases:
# UV: 0.2
# Green areas: 0.05
# City density: 0.1
# Ozone: 0.12
# Air pollution 0.1
# Pollen density: 0
import math

labels = ["uv", "green_density", "city_density", "ozone", "air_pollution", "pollen_density"]
multiplier_dict = {
    "asthma": [0,0,0.1,0.15,0.2,0.025],
    "pollen_allergy": [0,0.3,0.05,0.1,0.25,0],
    "other_respiratory_issues": [0,0,0.12,0.15,0.25,0],
    "cardiovascular_problems": [0,0,0.15,0.25,0.2,0],
    "skin_disease": [0.2,0.05,0.1,0.12,0.1,0],
}

def calculate_score(preferences, scores, age):
    if preferences == '': return sum(scores)

    age_addition = math.math.e ** (0.01*(age-35)-1) if age > 35 else 0
    age_addition = 1 if age_addition > 1 else age_addition
    multipliers = multiplier_dict['asthma']
    score = [sc * (1 + mult + age_addition) for sc, mult in zip(scores, multipliers)]
    return sum(score)