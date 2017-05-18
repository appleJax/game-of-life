port module ElmControlBar exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class, disabled)
import Html.Events exposing (onClick)
import Result exposing (..)


port speedToPort : Int -> Cmd msg


port sizeToPort : { x : Int, y : Int } -> Cmd msg


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


init : ( Model, Cmd Msg )
init =
    ( Model Medium Md, Cmd.none )


type alias Model =
    { speed : Speed
    , size : Size
    }


model : Model
model =
    Model Medium Md



-- UPDATE


type Msg
    = SetSpeed Speed
    | SetSize Size


type Speed
    = Slow
    | Medium
    | Fast


type Size
    = Sm
    | Md
    | Lg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetSpeed newSpeed ->
            let
                millis =
                    case newSpeed of
                        Slow ->
                            350

                        Medium ->
                            130

                        Fast ->
                            50
            in
                ( { model | speed = newSpeed }, speedToPort millis )

        SetSize newSize ->
            let
                ( width, height ) =
                    case newSize of
                        Sm ->
                            ( 30, 20 )

                        Md ->
                            ( 40, 30 )

                        Lg ->
                            ( 50, 40 )
            in
                ( { model | size = newSize }, sizeToPort { x = width, y = height } )



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div [ class "bar" ]
            [ span [ class "picker-label" ] [ text "Board Size:" ]
            , div [] (makeButtons model [ ( "Small", SetSize Sm ), ( "Medium", SetSize Md ), ( "Large", SetSize Lg ) ])
            ]
        , div [ class "bar" ]
            [ span [ class "picker-label" ] [ text "SIM Speed:" ]
            , div [] (makeButtons model [ ( "Slow", SetSpeed Slow ), ( "Medium", SetSpeed Medium ), ( "Fast", SetSpeed Fast ) ])
            ]
        ]


makeButtons : Model -> List ( String, Msg ) -> List (Html Msg)
makeButtons model attrs =
    List.map
        (btn model)
        attrs


btn : Model -> ( String, Msg ) -> Html Msg
btn model ( name, action ) =
    let
        active =
            case action of
                SetSize size ->
                    model.size == size

                SetSpeed speed ->
                    model.speed == speed

        className =
            if active then
                "btn--active"
            else
                ""
    in
        button
            [ class className
            , disabled active
            , onClick action
            ]
            [ text name ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
