Feature: As a user I want to check some API

# # http://api.openweathermap.org/data/2.5/weather?appid=2e03f0c8d17371fafdaeb3b98b9fa116&lat=42.3601&lon=-71.0589
# Scenario: Testing a sample api
#     Given user has an API end point http://api.openweathermap.org/data/2.5/weather?appid=2e03f0c8d17371fafdaeb3b98b9fa116&lat=42.3601&lon=-71.0589
#     # And user have parameters appid and 2e03f0c8d17371fafdaeb3b98b9fa116
#     # And user have parameters lat and 42.3601
#     # And user have parameters lon and -71.0589
#     And user has method as GET
#     When user fires the request to API
#     Then user should get response code as 200

Scenario Outline: Testing a sample api
    Given user has an API end point <EndPoint>
    And api has parameters <Parameters>
    And user has method as <Method>
    When user fires the request to API
    Then user should get response code as <Code>
    Examples:
        |                   EndPoint                     |                         Parameters                                                | Method | Code |
        | http://api.openweathermap.org/data/2.5/weather | {"appid": "2e03f0c8d17371fafdaeb3b98b9fa116", "lat":"42.3601", "lon":"-71.0589" } |   GET  | 200  |
        | http://api.openweathermap.org/data/2.5/weather | {"appid": "2e03f0c8d17371fafdaeb3b98b9fa116", "lat":"42.3601", "lon":"x" }        |   GET  | 300  |