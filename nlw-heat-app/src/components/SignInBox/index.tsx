import React from 'react';
import {useColorScheme, View } from 'react-native';
import { COLORS } from '../../theme';
import { styles } from '../Header/styles';
import { Button } from '../Button';
import { useAuth } from '../../hooks/auth';

export function SignInBox(){
    const {signIn, isSigningIng} = useAuth();
    return(
        <View style={styles.container}>
            <Button 
                title="ENTRAR COM O GITHUB"
                backgroundColor={COLORS.YELLOW}
                color={COLORS.BLACK_PRIMARY}
                icon="github"
                onPress={signIn}
                isLoading={isSigningIng}
            />
        </View>
    )
}
