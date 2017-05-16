port module ElmSpeedPicker exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, disabled)
import Html.Events exposing (onClick)


port speedToPort : Int -> Cmd msg


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


init : ( Model, Cmd msg )
init =
    ( Medium, Cmd.none )


type alias Model =
    Speed


model : Model
model =
    Medium



-- UPDATE


type Msg
    = SetSpeed Speed


type Speed
    = Slow
    | Medium
    | Fast


update : Msg -> Model -> ( Model, Cmd msg )
update (SetSpeed speed) model =
    let
        millis =
            case speed of
                Slow ->
                    350

                Medium ->
                    130

                Fast ->
                    50
    in
        ( speed, speedToPort millis )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "bar" ]
        [ span [ class "picker-label" ] [ text "SIM Speed:" ]
        , div [] (makeButtons model [ ( "Slow", Slow ), ( "Medium", Medium ), ( "Fast", Fast ) ])
        ]


makeButtons : Model -> List ( String, Speed ) -> List (Html Msg)
makeButtons model attrs =
    List.map
        (btn model)
        attrs


btn : Model -> ( String, Speed ) -> Html Msg
btn model ( name, action ) =
    let
        active =
            (model == action)

        className =
            if (active == True) then
                "btn--active"
            else
                ""
    in
        button
            [ class className
            , disabled
                (if active then
                    True
                 else
                    False
                )
            , onClick (SetSpeed action)
            ]
            [ text name ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
