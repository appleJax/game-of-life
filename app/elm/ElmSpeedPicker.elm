port module ElmSpeedPicker exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Model =
    Int


model : Model
model =
    0



-- UPDATE


type Msg
    = SetSpeed Speed


type Speed
    = Slow
    | Medium
    | Fast


update : Msg -> Model -> Model
update msg model =
    case msg of
        Speed speed ->
            case speed of
                Slow ->
                    350

                Medium ->
                    130

                Fast ->
                    50



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "bar" ]
        [ span [ class "picker-label" ] [ text "SIM Speed:" ]
        , makeButtons model [("Slow", Slow), ("Medium", Medium), ("Fast", Fast)]
        ]

makeButtons : Model -> List (String, Msg) -> Html Msg
makeButtons model attrs =
    List.map (btn model) attrs

btn : Model -> (String, Msg) -> Html Msg
btn model (name, action) =
    button [
        class if model
    ]
        [ text name ]
